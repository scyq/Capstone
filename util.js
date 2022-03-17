// 信息收集问卷内容
export function getQueries() {

	const sideQueries5 = [{
		content: '您有多少个哥哥',
		type: 'numberSelection',
		widgets: [1, 6]
	}, {
		content: '您有多少个姐姐',
		type: 'numberSelection',
		widgets: [1, 6]
	}, {
		content: '您有多少个弟弟',
		type: 'numberSelection',
		widgets: [1, 6]
	}, {
		content: '您有多少个妹妹',
		type: 'numberSelection',
		widgets: [1, 6]
	}];

	return [
		{
			content: "#video"
		},
		{
			content: '您的编号是？',
			type: 'textfield',
			widgets: null
		},
		{
			content: '您的性别？',
			type: 'buttons',
			widgets: ['男', '女']
		},
		{
			content: '您的生日',
			type: 'date'
		},
		{
			content: '您所在的年级',
			type: 'buttons',
			widgets: ['初一', '初二', '初三']
		},
		{
			content: '您所在的班级',
			type: 'textfield',
			widgets: null
		},
		{
			content: '您有没有兄弟姐妹',
			type: 'buttons',
			widgets: ['有', '没有'],
			side: {
				'有': sideQueries5,
				'没有': null
			}
		},
		{
			content: "您的出生省市",
			type: "city",
		},
		{
			content: "您母亲的年龄是多少岁",
			type: "numberInput",
			widgets: [20, 75, 0]
		},
		{
			content: "您父亲的年龄是多少岁",
			type: "numberInput",
			widgets: [22, 75, 0]
		},
		{
			content: '您母亲的最高学历是什么',
			type: 'buttons',
			widgets: ['小学', '初中', '高中', '大学', '硕士', '博士', '其它']
		},
		{
			content: '您母亲的婚姻状况是什么',
			type: 'buttons',
			widgets: ['初婚', '再婚', '复婚', '离异', '丧偶', '其它']
		},
		{
			content: '您父亲的最高学历是什么',
			type: 'buttons',
			widgets: ['小学', '初中', '高中', '大学', '硕士', '博士', '其它']
		},
		{
			content: '您父亲的婚姻状况是什么',
			type: 'buttons',
			widgets: ['初婚', '再婚', '复婚', '离异', '丧偶', '其它']
		}
	];
}

// 日常情绪调查问卷
export function getDailyScale() {
	const ifSharedAndReply = [{
			content: '对方是如何回复你的？',
			type: 'textSelection',
			widgets: [

				{
					bold: '提供不同的视角和看法'
				},
				{
					bold: '提供解决问题的建议和方法'
				},
				{
					bold: '鼓励我分享和表达自己的情绪和感受',
					normal: '（比如倾听我谈论或表达我的感受、帮我弄清楚我感受是什么）'
				},
				{
					bold: '在情感上对我表示理解、支持和鼓励',
					normal: '（比如用语言表达对我爱和关怀、给我拥抱）'
				},
				{
					bold: '对我进行说教',
					normal: '（比如认为我应该对所发生的事情负责、让我从自己身上找原因、进行自我反思、让我多学学别人）'
				},
				{
					bold: '认为这件事情不太重要',
					normal: '（比如告诉我这件事没什么值得不开心的；没什么大不了的；让我不要在意这些小事情）'
				},
				{
					bold: '认为我反应过度',
					normal: '（比如认为我是在小题大做、反应过度了、太脆弱了、抗压能力不够、情绪有些过激了、因为一点小事就情绪化）'
				},
				{
					bold: '埋怨、责怪、责骂或者惩罚我',
					nomal: '（例如，对我发脾气生气或对我大吼大叫，或者告诉我如果再不能控制的感情就要惩罚我）'
				},
				{
					bold: 'Ta也变得非常不舒服和不安，或者不愿意/不想面对我的不开心的情绪、回避我的消极情绪',
					normal: '（例如，ta也变得很焦虑或紧张；或者ta说不要跟我讲这些不开心的事情因为听了之后我也很烦）'
				}
			]
		},
		{
			content: 'Ta的回复在多大程度上有助于你的情绪恢复？',
			type: 'rating',
			widgets: 7
		}
	];

	const ifShared = [{
			content: '您是和谁分享分享的？',
			type: 'buttons',
			widgets: ['爸爸', '妈妈', '其他家人', '老师', '同学', '朋友']
		},
		{
			content: '分享对象的性别是？',
			type: 'buttons',
			widgets: ['男', '女'],
		},
		{
			content: '分享的方式是什么？',
			type: 'buttons',
			widgets: ['面对面', '语音电话', '视频聊天', '短消息']
		},
		{
			content: '当你分享完，收到对方的回复了吗？',
			type: 'buttons',
			widgets: ['没收到', '收到了'],
			side: {
				'没收到': null,
				'收到了': ifSharedAndReply
			}
		},
		{
			content: '你为什么跟ta分享你的心情和感感受？为了获得什么呢？',
			type: 'buttons',
			widgets: ['建议', '帮助', '信息', '同情', '关怀', '理解', '鼓励']
		}
	];


	return [{
			content: '今天你在多大程度上经历下面的情绪？',
			post: true
		},
		{
			content: '#image',
			src: "../../static/emoRating.png",
			post: true
		},
		{
			content: '紧张？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '害怕？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '担心？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '焦虑？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '生气？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '愤怒？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '敌意？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '难过？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '沮丧？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '失望？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '今天你跟其他人分享你不开心、不愉快的心情了吗？',
			type: 'buttons',
			widgets: ['有', '没有'],
			side: {
				'有': ifShared,
				'没有': null
			}
		},
		{
			content: '你不开心的原因是什么（发生了什么事情让你不开心）？',
			type: 'textfield'
		},
		{
			content: "感谢您今天的填写"
		}
	];
}
