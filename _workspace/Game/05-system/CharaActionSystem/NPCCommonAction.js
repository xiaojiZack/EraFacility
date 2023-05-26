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

Task.new({
	id:'test',
	name:'测试task',
	placement:'home',
	effect: (chara)=>{
		chara.source.lust += 1;
		console.log('taskEffect触发');
	}
})

