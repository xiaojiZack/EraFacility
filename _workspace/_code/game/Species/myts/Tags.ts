/**
 * TagsSystem
 * 算是人物内部作为palam运算的系统，
 * 与传统的era点击即加palam的情况不同。
 * 如果采用传统的按键计算方法，那么可能会发生时序问题，
 * 比如不同时长的com想要同时执行，
 * palam的相生相灭也需要时间，
 * 人物的特别状态，比如执行的命令，特殊派生，tags放在commandmeun上方
    tags:
        特殊状态:射精、绝顶、中出、喷乳、快去了
        动作：xx位、xx装备，捆绑类型、肢体捆绑、插入位置、肢体占用指令
        tag派生类：可移动、可使用设施、锁结
    带有调教状态时不可执行移动、使用设施等行为
    当目标对象脱离观测时，结束非工作类持续tag
    新想法：改装调教用具，如装卸模块式按摩棒
    tags作为新类增加。
    tags有type【tag的tags】，name，inf（携带信息）,visiable（对玩家是否可见），来源指令，描述、dot效果等
    tags管理函数:
        1.查询角色是否有特定tag
        2.新增tag
        3.删除tag
        4.tags派生tag
        5.添加tag触发函数、删除tag触发函数、保持tag触发函数？
 */

import { Dict } from "../../types";

declare var D: typeof window.D;
declare var S: typeof window.S;

export interface CharaTag{
    type:string[];
    name:string;
    inf:Dict<any>;
    visiable:boolean;
    sourceCom?:string;
    describe?:string;
    dot?:[{source:string,value:number, type:string, inf?:any}];
    checkSource?:Dict<{value:number, type:string}>;
    derive?:string[];
    trigger?:(any)=>any
    addTrigger:(any?)=>any
    delTrigger:(any?)=>(any)
}

export class CharaTag{
    static data:Dict<CharaTag>;

    static get(tagId){
        //copy the data from database
        if (Object.keys(CharaTag.data).has(tagId)){
            let Tag = new CharaTag(tagId, {});
            Object.assign(Tag, CharaTag.data[tagId]);
            return Tag;
        }
        else{
            console.error('不存在预设tag模板', tagId);
            return new CharaTag(tagId, {})
        }
    }
    static new(TagId: string, obj={}): CharaTag {
		let Tag = new CharaTag(TagId, obj);
		this.data[TagId] = Tag;
		return Tag;
	}

    constructor(tagName, obj){
        this.name = tagName;
        this.inf = obj.inf?obj.inf:{};
        this.type = obj.type?obj.type:[];
        this.visiable = obj.visiable?obj.visiable:false;
        if(obj.describe) this.describe = obj.describe;
        if(obj.dot) this.dot = obj.dot;
        if(obj.checkSource) this.checkSource = obj.checkSource;
        if(obj.derive) this.derive = obj.derive
        this.addTrigger = (chara)=>{}
        this.delTrigger = (chara)=>{}
        return this;
    } 

    set(id:string, value){
        this[id] = value;
        return this
    }

    setTrigger(callback){
        this.trigger = callback;
        return this;
    }
    //用于在加入时触发某些东西，比如口上
    setAddTrigger(callback){
        this.addTrigger = callback;
        return this;
    }

    setDelTrigger(callback){
        this.delTrigger = callback;
        return this;
    }

}

export class CharaTagManager{
    data:CharaTag[];

    constructor(){
        this.data = [];
        return this;
    }
    has(tagId){
        for (let tag of this.data){
            if (tag.name == tagId) {return true}
        }
        return false
    }

    find(tagId){
        for (let tag of this.data){
            if (tag.name == tagId) {return tag}
        }
        return false
    }

    add(tagId, chara, obj?:Dict<any>){
        let newTag = CharaTag.get(tagId);
        for (let existtag of this.data){
            if (existtag.name == tagId) return this
        }
        if (obj){
            Object.keys(obj).forEach(key=>{
                newTag.set(key,obj[key])
                newTag.addTrigger(chara)
            })
        }
        this.data.push(newTag)

        if (newTag.derive){
            for (let deriveTag of newTag.derive){
                this.add(deriveTag, chara, obj)
            }
        }

        return this
    }

    del(tag, chara){
        if (typeof(tag) == typeof("")){
            this.data.forEach(owntag => {
                tag = owntag.name == tag ? owntag:tag;
            });
        }
        if (this.data.has(tag)){
            tag.delTrigger(chara)
            this.data.delete(tag)
            if (tag.derive){
                tag.derive.forEach(derive=>{
                    this.del(this.has(derive), chara)
                })
            }
        }
        return this;
    }

    /**
     * 检查当前人物的tag，根据tag自身维持条件和触发条件检查是否有增减
     */
    update(chara){
        //自动派生
        Object.values(CharaTag.data).forEach(tag=>{
            if(tag.trigger) {
                if (tag.trigger(chara)){
                    this.add(tag.name,chara)
                }
            }
        })

        this.data.forEach(tag=>{
            console.log('tag检测',tag,tag.type)
            if (tag.type.has('keep')){
                //持续型
            }
            if (tag.type.has('palam')){
                let flag = true
                Object.keys(tag.checkSource).forEach(key=>{
                    let realV
                    if (D.basekey.has(key)){
                        realV = chara.base[key][0]
                    }
                    if (key in D.palam){
                        realV = chara.palam[key][0]+1;
                    }
                    switch (tag.checkSource[key].type) {
                        case ">":
                            flag =flag && realV>tag.checkSource[key].value
                            break;
                        case ">=":
                            flag =flag && realV>=tag.checkSource[key].value
                            break;
                        case "<":
                            flag =flag && realV<tag.checkSource[key].value
                            break;
                        case "<=":
                            flag =flag && realV<=tag.checkSource[key].value
                            break;
                        case "=":
                            flag =flag && realV==tag.checkSource[key].value
                            break;
                        default:
                            break;
                    }
                    console.log('tag持续测试',tag.name, flag, realV, tag.checkSource[key].value)
                })
                if (!flag) this.del(tag, chara)
            }
        })
    }
}

CharaTag.data = {};