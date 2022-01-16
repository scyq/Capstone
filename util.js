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
		},
	];
}



const main = [];
