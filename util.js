// 信息收集问卷内容
export function getQueries() {

	const sideQueries5 = [{
		text: '您有多少个哥哥',
		type: 'numberSelection',
		widgets: [1, 6]
	}, {
		text: '您有多少个姐姐',
		type: 'numberSelection',
		widgets: [1, 6]
	}, {
		text: '您有多少个弟弟',
		type: 'numberSelection',
		widgets: [1, 6]
	}, {
		text: '您有多少个妹妹',
		type: 'numberSelection',
		widgets: [1, 6]
	}];

	return [{
			text: '您的编号是？',
			type: 'textfield',
			widgets: null
		},
		{
			text: '您的性别？',
			type: 'buttons',
			widgets: ['男', '女']
		},
		{
			text: '您的生日',
			type: 'date'
		},
		{
			text: '您所在的年级',
			type: 'buttons',
			widgets: ['初一', '初二', '初三']
		},
		{
			text: '您所在的班级',
			type: 'textfield',
			widgets: null
		},
		{
			text: '您有没有兄弟姐妹',
			type: 'buttons',
			widgets: ['有', '没有'],
			side: {
				'有': sideQueries5,
				'没有': null
			}
		},
		{
			text: "您的出生省市",
			type: "city",
		},
		{
			text: "您母亲的年龄是多少岁",
			type: "numberInput",
			widgets: [20, 75, 35]
		},
		{
			text: "您父亲的年龄是多少岁",
			type: "numberInput",
			widgets: [22, 75, 35]
		},
		{
			text: '您母亲的最高学历是什么',
			type: 'buttons',
			widgets: ['小学', '初中', '高中', '大学', '硕士', '博士', '其它']
		},
		{
			text: '您母亲的婚姻状况是什么',
			type: 'buttons',
			widgets: ['初婚', '再婚', '复婚', '离异', '丧偶', '其它']
		},
		{
			text: '您父亲的最高学历是什么',
			type: 'buttons',
			widgets: ['小学', '初中', '高中', '大学', '硕士', '博士', '其它']
		},
		{
			text: '您父亲的婚姻状况是什么',
			type: 'buttons',
			widgets: ['初婚', '再婚', '复婚', '离异', '丧偶', '其它']
		}
	];
}

// 日常情绪调查问卷
export function getDailyScale() {

	const ifShared = [{
			text: '您是和谁分享分享的？',
			type: 'buttons',
			widgets: ['爸爸', '妈妈', '其他家人', '老师', '同学', '朋友']
		},
		{
			text: '分享对象的性别是？',
			type: 'buttons',
			widgets: ['男', '女']
		}
	];

	return [{
			text: '今天你在多大程度上经历下面的情绪？',
			post: true
		},
		{
			text: '紧张？',
			type: 'rating',
		},
		{
			text: '害怕？',
			type: 'rating',
		},
		{
			text: '担心？',
			type: 'rating',
		},
		{
			text: '焦虑？',
			type: 'rating',
		},
		{
			text: '生气？',
			type: 'rating',
		},
		{
			text: '愤怒？',
			type: 'rating',
		},
		{
			text: '敌意？',
			type: 'rating',
		},
		{
			text: '难过？',
			type: 'rating',
		},
		{
			text: '沮丧？',
			type: 'rating',
		},
		{
			text: '失望？',
			type: 'rating',
		},
		{
			text: '今天你跟其他人分享你不开心、不愉快的心情了吗？',
			type: 'buttons',
			widgets: ['有', '没有'],
			side: {
				'有': ifShared,
				'没有': null
			}
		},
	];
}
