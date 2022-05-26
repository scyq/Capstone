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
			content: "可以告诉我，ta具体是怎么回复你的吗？",
			post: true
		},
		{
			content: "请详细描述对方的回复，比如对方说了些什么？",
			type: "textfield"
		},
		{
			content: '可否从以下内容中选择最接近的？（可多选）',
			type: 'textSelection',
			widgets: [{
					bold: '提供解释、帮助我理解当下的状况',
					normal: '(例如：提供不同的视角和看法、帮我分析事情的原因、让我对问题有更多的理解)'
				},
				{
					bold: '提供解决问题的建议和方法',
					normal: '（例如：和我讨论如何解决令我不安的事情；和我分享，ta遇到类似问题时是如何处理的；和我讨论解除困境的办法；给我一些让事情变得更好的建议）'
				},
				{
					bold: '鼓励我分享和表达自己的情绪和感受',
					normal: '（例如： 鼓励我把不好的情绪发泄出来；尝试描述我的情绪和感受，比如“你肯定很难受”；会帮助我弄清楚我自己的情绪是什么, 比如“实际上，你很生气”；会鼓励我表达自己的情绪）'
				},
				{
					bold: '在情感上对我表示理解、支持和鼓励',
					normal: '（例如：告诉我，ta能够理解我的感受；会安慰我，比如“一切都会好起来的”;会给我加油、鼓气; 逗我笑，以此来让我感觉好一些;和我一起做些好玩的事情，让我放松下来）'
				},
				{
					bold: '对我进行说教',
					normal: '（例如：会指出我哪里做的不够好；让我反思自己做得不好的地方；对我提出新的要求和期望；告诉我，在哪些方面ta仍然不太满意我的表现；指出我犯的错误）'
				},
				{
					bold: '轻视我的情绪或者淡化事情的重要性',
					normal: '（例如：告诉我这件事没什么值得不开心的、事情不像看起来那么糟糕、没什么大不了的、让我不要在意这些小事情、没什么值得难过、焦虑或者生气的）'
				},
				{
					bold: '认为我小题大做、反应过激',
					normal: '（例如：认为我是在小题大做、太脆弱了、抗压能力不够、因为一点小事就情绪化、这么生气或愤怒是愚蠢的表现）'
				},
				{
					bold: '责怪、责骂或者惩罚我',
					normal: '（例如： 威胁要惩罚我； 因为我如此情绪化而对我感到生气或愤怒；责骂我控制不好情绪；因为我感到如此情绪化而责骂我；斥责我没有把事情处理的更好；因为我情绪不好而责骂我）'
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
			content: "可以告诉我，你为什么觉得这些回复对你情绪调节有帮助或者没有帮助吗？",
			type: "textfield"
		}
	];

	const ifShared = [{
			content: "可以告诉我，你是和谁分享的吗？",
			post: true
		},
		{
			content: '如果你今天和不同的人分享了心情，请选择一个最主要的分享对象：',
			type: 'buttons',
			widgets: ['父母', '祖父母', '兄弟姐妹', '其他家人', '班主任',
				'其它老师', '心理老师', ' 同学', '校外朋友'
			]
		},
		{
			content: '分享对象的性别是？',
			type: 'buttons',
			widgets: ['男', '女'],
		},
		{
			content: "你是用什么方式分享的？",
			post: true
		},
		{
			content: '注意，微信或者QQ的文字聊天都属于短消息',
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
			content: "请问，你为什么想要和ta分享你的心情和感受呢?(请详细地说说你和别人分享自己情绪的原因，例如你希望得到哪些支持、帮助或者建议？)",
			type: "textfield"
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
					normal: '（比如帮助我分析和理解我的情绪；帮我分析让我不开心的事情，从而促进我对情绪或者对事情的原因有新的认识；帮助我对自己和他人的动机和行为有更多理解；帮助我理清楚我的目标；促进我理解这件事情的意义、对我的影响等）'
				},
				{
					bold: '行动上的建议',
					normal: '（比如帮助我找到解决问题的办法；和我分享他们遇到类似的事情时如何处理的；给与我一些解决问题的建议）'
				}
			]
		}
	];

	const notSkip = [{
			content: "可以告诉我：你是因为什么事情不开心吗？",
			post: true
		},
		{
			content: "如果可以的话，请详细地跟我分享一下这件事情发生的经过（包括时间、地点、事情的起因、过程、结果等），特别是在这件事情当中你的感受和想法。",
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
	]

	const emotionJudge = (pointer, params) => {
		if (params.value !== "完全没有") {
			pointer.skipScales = false;
		}
	}

	return [{
			content: "你好呀，很高兴可以与你对话！",
			post: true
		},
		{
			content: "下面，让我们开始吧！",
			post: true
		},
		{
			content: "首先，请在输入框内输入您的编号。",
			type: "textfield",
			callback: (pointer, params) => {
				// pointer 把index的指针传进来
				pointer.scaleId = params.value;
			}
		},
		{
			content: '今天你在多大程度上经历了下面的情绪？希望你能和我们尽可能的多分享你的真实感受~~',
			post: true
		},
		{
			content: '#image',
			src: "../../static/emoRating.png",
			post: true
		},
		{
			content: '生气/愤怒/不满？',
			type: 'buttons',
			widgets: ['完全没有', '有一点', '非常多'],
			callback: emotionJudge
		},
		{
			content: '害怕？',
			type: 'buttons',
			widgets: ['完全没有', '有一点', '非常多'],
			callback: emotionJudge
		},
		{
			content: '焦虑/担忧？',
			type: 'buttons',
			widgets: ['完全没有', '有一点', '非常多'],
			callback: emotionJudge
		},
		{
			content: '难过/伤心？',
			type: 'buttons',
			widgets: ['完全没有', '有一点', '非常多'],
			callback: emotionJudge
		},
		{
			content: '挫败/沮丧？',
			type: 'buttons',
			widgets: ['完全没有', '有一点', '非常多'],
			callback: emotionJudge
		},
		{
			content: '羞愧？',
			type: 'buttons',
			widgets: ['完全没有', '有一点', '非常多'],
			callback: emotionJudge
		},
		{
			content: '内疚？',
			type: 'buttons',
			widgets: ['完全没有', '有一点', '非常多'],
			callback: emotionJudge
		},
		{
			content: '嫉妒？',
			type: 'buttons',
			widgets: ['完全没有', '有一点', '非常多'],
			callback: emotionJudge,
			judge: (pointer) => {
				if (!pointer.skipScales) {
					return true;
				}
				return false;
			},
			judgeCallback: (pointer) => {
				pointer.queries.splice(pointer.queryIndex + 1, 0, ...notSkip);
			}
		},
		{
			content: "今天的记录已经结束，感谢填写！"
		}
	];
}


export function getTest() {
	return [{
		content: '分享的方式是什么？',
		type: 'buttons',
		widgets: ['面对面', '语音电话', '视频聊天', '短消息']
	}, {
		content: '您是和谁分享的？（如果您今天跟不同人分享了，请选择一个最主要的分享对象）',
		type: 'buttons',
		widgets: ['爸爸', '妈妈', '祖父母', '兄弟姐妹', '其他家人', '班主任',
			'其它老师', '同学', '校外朋友'
		]
	}, ]
}
