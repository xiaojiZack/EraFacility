/**
 * task类，用于描述NPC自主任务的类
 * 可以认为是NPC专用的com
 * actPart需要使用的身体部位
    effect 效果
    id 唯一名，英文
    name 显示名
    placement 固定场地
    setting 
    tags 需要的场地tag
    targetPart 目标身体部位
    type

    新增preset，描述需要替换的服装，并非强制要求着装，如果人物的口上有就替换仅以名字命名
    新增stopabe，可否打断
    新增stopEffect, 停止处理
    新增precheck 能否被NPC挑选

    可以从建筑中新增新的action
    exection的时候记录当前执行的action

 */

export interface Task{
    id:string;
    name:string;
    placement:string;
    actpart:Array<string>;
    targetpart:Array<string>;
    setting:Array<string>;
    tags:Array<string>;
    type:Array<string>;
    precheck: (any)=>(any);
    preset:string;
}

export class Task{
    static data = {};

    constructor(obj){
        const {id, name, placement='', setting=[], tags=[],actpart=[], targetpart=[],
            type=[], preset='', stopable=false,
            precheck=(arg)=>{return true}, effect=(arg)=>{}, endeffect=(arg)=>{}} = obj;
        this.id = id;
        this.name = name;
        this.actpart = actpart;
        this.placement = placement;
        this.setting = setting;
        this.tags = tags;
        this.targetpart = targetpart;
        this.type = type;
        this.stopable = stopable;
        this.precheck = precheck;
        this.effect = effect;
        this.endeffect =endeffect;
        this.preset = preset;
        return this;
    }

    static new(obj){
        const id = obj.id;
        const newTask = new Task(obj);
        Task.data[id] = newTask;
        return newTask
    }

    static get(id){
        return Task.data[id];
    }

    execute(chara){
        //preset 衣物套装替换
        //TODO

        return this.effect(chara);
    }
    
    break(chara){
        if (this.stopable){
            return this.endeffect(chara);
        }
        else return false; 
    }

    effect(callback){
        this.effect = callback;
        return this;
    }
    endeffect(callback){
        this.endeffect = callback;
        return this;
    }
    stopable(flag){
        this.stopable = flag;
        return this;
    }
}