<template>
	<view class="chat">
		<u-navbar @leftClick="backToWelcome()"></u-navbar>
		<view class="container">
			<tsu-dialog v-for="(dialog, index) of dialogs" :key="dialog" :direction="getDirection(index)">{{ dialog }}</tsu-dialog>
		</view>
		<tsu-answer @nextDialog="nextDialog" :answerWidgets="answerWidgets"></tsu-answer>
	</view>
</template>

<script>
import { getQueries } from '../../util.js';

export default {
	onLoad() {
		this.queries = getQueries();
		const firstDialog = this.queries[this.queryIndex];
		this.addDialog(firstDialog.text);
		this.answerWidgets = firstDialog;
	},
	data() {
		return {
			queries: null,
			answerWidgets: {
				type: 'textfield',
				widgets: null
			},
			queryIndex: 7,
			dialogs: []
		};
	},
	methods: {
		backToWelcome() {
			uni.navigateTo({
				url: '../welcome/welcome'
			})({});
		},
		nextDialog(params) {
			this.addDialog(params.value);
			if (params.side) {
				this.queries.splice(this.queryIndex + 1, 0, ...params.side);
			}
			this.queryIndex++;
			const toAsk = this.queries[this.queryIndex];
			this.addDialog(toAsk.text);
			this.answerWidgets = toAsk;
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
