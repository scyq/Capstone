<template>
	<view class="chat">
		<u-navbar @leftClick="backToWelcome()" rightIcon="setting"></u-navbar>
		<scroll-view id="scrollview" class="container" scroll-y="true" :scroll-top="scrollTop">
			<view id="dialogs" class="dialog-container">
				<tsu-dialog v-for="(dialog, index) of dialogs" :key="dialog" :direction="getDirection(index)">{{ dialog }}</tsu-dialog>
			</view>
		</scroll-view>
		<tsu-answer :answerHeight="answerHeight" @nextDialog="nextDialog" :answerWidgets="answerWidgets"></tsu-answer>
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
			scrollTop: 0,
			answerHeight: '160rpx',
			queries: null,
			answerWidgets: {
				type: 'textfield',
				widgets: null
			},
			queryIndex: 0,
			dialogs: []
		};
	},
	methods: {
		scrollToBottom() {
			let that = this;
			let query = uni.createSelectorQuery();
			query.select('#scrollview').boundingClientRect();
			query.select('#dialogs').boundingClientRect();
			query.exec(res => {
				console.log(res);
				if (res[1].height > res[0].height) {
					that.scrollTop = res[1].height - res[0].height + 20;
				}
			});
		},
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
	components: {},
	updated() {
		this.scrollToBottom();
	}
};
</script>

<style>
.chat {
	background-color: #fefaf1;
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
}

.container {
	margin-top: 10rpx;
	font-size: 14px;
	line-height: 24px;
	height: auto !important;
	max-height: 80vh;
	overflow: auto;
}

.dialog-container {
	padding-bottom: 20rpx;
}
</style>
