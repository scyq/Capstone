// 信息收集问卷内容
/*
	每一个对话气泡应该是一个JavaScript对象
	其中content确定的是该气泡内部的内容，如果是以#开头则代表是一个特殊对象，目前#image代表是图片，#video代表是视频
	type和widgets共同决定了回复组件是什么
*/
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

	return [{
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
			content: "ta具体是怎么回复你的？（请详细描述过程，比如对方说了什么？）",
			type: 'textfield'
		},
		{
			content: '可否从以下内容中选择最接近的？',
			type: 'textSelection',
			widgets: [{
					bold: '提供解释、帮助我理解当下的状况',
					normal: '(比如提供不同的视角和看法、帮我分析事情的原因、让我对问题有更多的理解)'
				},
				{
					bold: '提供解决问题的建议和方法',
					normal: '（比如和我讨论如何解决问题，和我分享ta遇到类似问题是如何处理的、给我一些让事情更好的建议）'
				},
				{
					bold: '鼓励我分享和表达自己的情绪和感受',
					normal: '（比如倾听我谈论或表达我的感受、帮我弄清楚我感受是什么、鼓励我把不开心的情绪发泄处理）'
				},
				{
					bold: '在情感上对我表示理解、支持和鼓励',
					normal: '（比如用语言表达对我爱和关怀、给我拥抱、安慰我一起都会好起来、逗我笑以此来让我感觉好一些、和我一起做一些好晚的事情让我放松下来）'
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
					nomal: '（例如，对我发脾气生气或对我大吼大叫，或者告诉我如果再不能控制的情绪就要惩罚我、因为我情绪不好责骂我）'
				},
				{
					bold: 'ta也变得非常不舒服和不安，或者不愿意/不想面对我的不开心的情绪、回避我的消极情绪',
					normal: '（例如，ta也变得很焦虑或紧张；或者ta说不要跟我讲这些不开心的事情因为听了之后ta也很烦）'
				}
			]
		},
		{
			content: 'ta的回复在多大程度上有助于你的情绪恢复？（图片是选项数字的解释）',
			post: true
		},
		{
			content: '#image',
			src: "../../static/feedbackRating.png",
			type: 'rating',
			widgets: 7,
		},
		{
			content: "你为什么觉得对你情绪调节有帮助？（或者为什么觉得没有帮助，请详细描述）",
			type: "textfield"
		}
	];

	const ifShared = [{
			content: '您是和谁分享分享的？',
			type: 'buttons',
			widgets: ['爸爸', '妈妈', '祖父母', '兄弟姐妹', '其他家人', '班主任',
				'其它老师', '同学', '校外朋友'
			]
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
			content: "你为什么跟ta分享你的心情和感受？为了获得什么呢？（或者你分享的出发点是什么，请详细描述）",
			type: 'textfield',
		},
		{
			content: '可否从以下内容中选择最接近的？（可多选）',
			type: 'textSelection',
			widgets: [{
					bold: '情感上的支持',
					normal: '（比如给与我安慰、鼓励、支持、关心、理解、爱、温暖、认可）'
				},
				{
					bold: '认知上的帮助',
					normal: '（比如帮助我分析和理解我的情绪；帮我分析我不开心的事情、促进我对情绪或者对事情的原因有新的认识；帮助对自己和他人的动机和行为有更多理解；帮助我理清楚我的目标；促进我理解这件事情的意义、对我的影响等）'
				},
				{
					bold: '行动上的建议',
					normal: '（比如帮助我找到解决问题的办法；和我分享他们遇到类似的事情时如何处理的；给与我一些解决问题的建议）'
				}
			]
		},
	];

	return [{
			content: "您的序号是？",
			type: "textfield",
			callback: (pointer, params) => {
				// pointer 把index的指针传进来
				pointer.scaleId = params.value;
			}
		},
		{
			content: "您的姓名是？",
			type: "textfield",
			callback: (pointer, params) => {
				pointer.username = params.value;
			}
		},
		{
			content: '今天你在多大程度上经历了下面的情绪？（图片是选项数字的解释）',
			post: true
		},
		{
			content: '#image',
			src: "../../static/emoRating.png",
			post: true
		},
		{
			content: '生气/愤怒/不满？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '害怕？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '焦虑/担心？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '难过/伤心？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '挫败/沮丧？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '#image',
			src: "../../static/emoRating.png",
			post: true
		},
		{
			content: '羞愧？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '内疚？',
			type: 'rating',
			widgets: 5
		},
		{
			content: '嫉妒？',
			type: 'rating',
			widgets: 5
		},
		{
			content: "因为什么事让你不开心？（请详细描述事情发生的经过，包括时间、地点和具体发生的事情）",
			type: "textfield"
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
			content: "感谢您今天的填写"
		}
	];
}


export function getTest() {
	return [{
		content: '分享的方式是什么？',
		type: 'buttons',
		widgets: ['面对面', '语音电话', '视频聊天', '短消息']
	}, {
		content: '您是和谁分享分享的？（如果您今天跟不同人分享了，请选择一个最主要的分享对象）',
		type: 'buttons',
		widgets: ['爸爸', '妈妈', '祖父母', '兄弟姐妹', '其他家人', '班主任',
			'其它老师', '同学', '校外朋友'
		]
	}, ]
}
