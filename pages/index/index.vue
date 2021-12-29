<template>
	<view class="chat">
		<u-navbar></u-navbar>
		<view class="container">
			<tsu-dialog v-for="(dialog, index) of dialogs" :key="dialog" :direction="getDirection(index)">{{ dialog }}</tsu-dialog>
		</view>
		<tsu-answer @nextDialog="nextDialog" :answerWidgets="answerWidgets"></tsu-answer>
	</view>
</template>

<script>
const queries = [
	// {
	// 	id: '1',
	// 	text: '您的编号是？',
	// 	type: 'textfield',
	// 	widgets: null
	// },
	// {
	// 	id: '2',
	// 	text: '您的性别？',
	// 	type: 'buttons',
	// 	widgets: ['男', '女']
	// },
	// {
	// 	id: '3',
	// 	text: '您的生日',
	// 	type: 'date'
	// },
	// {
	// 	id: '4',
	// 	text: '您所在的年级',
	// 	type: 'buttons',
	// 	widgets: ['初一', '初二', '初三']
	// },
	// {
	// 	id: '5',
	// 	text: '您所在的班级',
	// 	type: 'textfield',
	// 	widgets: null
	// },
	// {
	// 	id: '6',
	// 	text: '您有没有兄弟姐妹',
	// 	type: 'buttons',
	// 	widgets: ['有', '没有']
	// },
	{
		id: '6.1',
		text: '您有多少个哥哥',
		type: 'numberSelection',
		widgets: [1, 6]
	}
];

export default {
	onLoad() {
		const firstDialog = queries[0];
		this.addDialog(firstDialog.text);
		this.answerWidgets = {
			type: firstDialog.type,
			widgets: firstDialog.widgets
		};
	},
	data() {
		return {
			answerWidgets: {
				type: 'textfield',
				widgets: null
			},
			dialogIndex: 0,
			dialogs: []
		};
	},
	methods: {
		nextDialog(params) {
			this.addDialog(params);
			this.dialogIndex++;
			const toAsk = queries[parseInt((this.dialogIndex + 1) / 2)];
			this.addDialog(toAsk.text);
			this.dialogIndex++;
			this.answerWidgets = {
				type: toAsk.type,
				widgets: toAsk.widgets
			};
		},
		addDialog(text) {
			this.dialogs.push(text);
		},
		getDirection(index) {
			return index & 1 ? 'right' : 'left';
		}
	},
	computed: {},
	components: {}
};
</script>

<style>
.chat {
	background-color: #fefaf1;
	height: 100vh;
}

.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
}
</style>
