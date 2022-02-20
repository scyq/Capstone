<template>
	<view class="chat">
		<u-navbar rightIcon="setting" height="66px">
			<view class="u-nav-slot" slot="left"><image class="robot-avatar" src="../../static/robot1.png"></image></view>
			<view class="u-nav-slot" style="display: flex; flex-direction: column; align-items: center;" slot="right"><uni-icons type="gear" size="30"></uni-icons></view>
		</u-navbar>
		<scroll-view id="scrollview" class="container" scroll-y="true" :scroll-top="scrollTop">
			<view id="dialogs" class="dialog-container">
				<tsu-dialog v-for="(dialog, index) of dialogs" :key="index" :direction="dialog.direction">{{ dialog.text }}</tsu-dialog>
			</view>
		</scroll-view>
		<view v-if="showLoading" class="loading-wrapp">
			<view class="loading-ball" style="background: #2153F9;"></view>
			<view class="loading-ball" style="background: #9C0CE8;"></view>
			<view class="loading-ball" style="background: #FF0000;"></view>
			<view class="loading-ball" style="background: #E8750C;"></view>
			<view style="color: rgba(0, 0, 0, 0.25); margin-left: 8rpx;">正在输入...</view>
		</view>
		<tsu-answer :answerHeight="answerHeight" @nextDialog="nextDialog" :answerWidgets="answerWidgets"></tsu-answer>
	</view>
</template>

<script>
import { getQueries, getDailyScale } from '../../util.js';

export default {
	onLoad() {
		this.queries = this.getQueriesBySource(this.querySource);
		this.askQuestion();
	},
	data() {
		return {
			scrollTop: 0,
			answerHeight: '160rpx',
			querySource: 'daily', // 用于控制问卷的内容，可以是information（用于收集个人信息），可以是daily（调查每日情绪）
			queries: null,
			answerWidgets: {
				type: 'textfield',
				widgets: null
			},
			queryIndex: 0,
			dialogs: [],
			showLoading: false
		};
	},
	methods: {
		askQuestion(queryIndex) {
			let toAsk = this.queries[this.queryIndex];
			this.addDialog({ text: toAsk.text, direction: 'left' });
			this.answerWidgets = toAsk;
			while (toAsk.post) {
				this.queryIndex++;
				toAsk = this.queries[this.queryIndex];
				this.addDialog({ text: toAsk.text, direction: 'left' });
				this.answerWidgets = toAsk;
			}
		},
		getQueriesBySource(source) {
			let _queries;
			switch (this.querySource) {
				case 'information':
					_queries = getQueries();
					break;
				case 'daily':
					_queries = getDailyScale();
					break;
				default:
					_queries = getQueries();
					break;
			}
			return _queries;
		},
		scrollToBottom() {
			let that = this;
			let query = uni.createSelectorQuery();
			query.select('#scrollview').boundingClientRect();
			query.select('#dialogs').boundingClientRect();
			query.exec(res => {
				// if (res[1].height > res[0].height) {
				// 	const tweenDuration = 50;
				// 	const scrollDistance = res[1].height - res[0].height - that.scrollTop;
				// 	const velocity = scrollDistance / tweenDuration;
				// 	let tween = setTimeout(() => {
				// 		that.scrollTop += velocity;
				// 	}, 1);
				// 	setInterval(() => {
				// 		clearTimeout(tween);
				// 	}, tweenDuration);
				// }
				if (res[1].height > res[0].height) {
					that.scrollTop = res[1].height - res[0].height + 20;
				}
			});
		},
		nextDialog(params) {
			const loadingAnimationTime = 600;
			this.addDialog({ text: params.value, direction: 'right' });
			this.showLoading = true;
			setTimeout(() => {
				// 增加一个子问题
				if (params.side) {
					this.queries.splice(this.queryIndex + 1, 0, ...params.side);
				}
				this.queryIndex++;
				if (this.queryIndex >= this.queries.length) {
					switch (this.querySource) {
						case 'information':
							this.querySource = 'daily';
							break;
						default:
							break;
					}
					this.queryIndex = 0;
					this.queries = this.getQueriesBySource(this.querySource);
				}
				this.askQuestion();
				this.showLoading = false;
			}, loadingAnimationTime);
		},
		addDialog(dialog) {
			this.dialogs.push(dialog);
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
	height: 76vh;
	overflow: auto;
}

.dialog-container {
	padding-bottom: 20rpx;
}

.robot-avatar {
	width: 50px;
	height: 50px;
}

.loading-wrapp {
	display: flex;
	margin: 20rpx 0 20rpx 10vw;
	flex-direction: row;
	align-items: center;
}

@keyframes loadingInput {
	0 {
		transform: translate(0, 0);
	}

	50% {
		transform: translate(0, 6px);
	}

	100% {
		transform: translate(0, 0);
	}
}

.loading-wrapp .loading-ball:nth-last-child(2) {
	animation: loadingInput 0.6s 0.1s linear infinite;
}

.loading-wrapp .loading-ball:nth-last-child(3) {
	animation: loadingInput 0.6s 0.2s linear infinite;
}

.loading-wrapp .loading-ball:nth-last-child(4) {
	animation: loadingInput 0.6s 0.3s linear infinite;
}

.loading-wrapp .loading-ball:nth-last-child(5) {
	animation: loadingInput 0.6s 0.4s linear infinite;
}

.loading-ball {
	width: 18rpx;
	height: 18rpx;
	border-radius: 50%;
	margin: 8rpx;
}
</style>
