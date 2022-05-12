<template>
	<view class="chat">
		<u-navbar rightIcon="setting" height="66px">
			<view class="u-nav-slot" slot="left"><image class="robot-avatar" src="../../static/robot1.png"></image></view>
			<view class="u-nav-slot" style="display: flex; flex-direction: column; align-items: center;" slot="right" @click="more">
				<uni-icons type="more" size="30"></uni-icons>
			</view>
		</u-navbar>
		<scroll-view id="scrollview" class="container" scroll-y="true" :scroll-top="scrollTop">
			<view id="dialogs" class="dialog-container">
				<tsu-dialog v-for="(dialog, index) of dialogs" :key="index" :direction="dialog.direction">
					<image class="dialog-image" v-if="dialog.content === '#image'" :src="dialog.src" mode="aspectFit" lazy-load="true"></image>
					<video
						v-else-if="dialog.content === '#video'"
						id="myVideo"
						src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
						@error="videoErrorCallback"
						:danmu-list="danmuList"
						enable-danmu
						controls
					></video>
					<view v-else>{{ dialog.content }}</view>
				</tsu-dialog>
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
import { getQueries, getDailyScale, getTest } from '../../scale.js';
import { newRecord } from '../../net.js';

export default {
	onLoad() {
		if (this.testMode) {
			this.queries = getTest();
		} else {
			this.queries = this.getQueriesBySource(this.querySource);
		}
		this.askQuestion();
	},
	data() {
		return {
			testMode: false, // 是否开启调试模式
			postPermission: true, // 防止连续点击
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
		more() {
			uni.navigateTo({
				url: '../welcome/welcome?interactive=false'
			});
		},
		getDialogContent(dialog) {
			if (dialog.content === '#image') {
			}
			return dialog.content;
		},
		askQuestion(queryIndex) {
			let toAsk = this.queries[this.queryIndex];
			this.addDialog(toAsk);
			this.answerWidgets = toAsk;
			// 如果还有后续
			if (toAsk.post) {
				this.showLoading = true;
				this.queryIndex++;
				setTimeout(() => {
					this.showLoading = false;
					this.askQuestion(queryIndex);
				}, 1000);
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
				if (res[1].height > res[0].height) {
					that.scrollTop = res[1].height - res[0].height + 20;
				}
			});
		},
		nextDialog(params) {
			if (this.postPermission) {
				if (params.callback) {
					params.callback(this, params);
				}
				this.postPermission = false;
				const loadingAnimationTime = 600;
				this.addDialog({ content: params.value, direction: 'right' });
				this.showLoading = true;
				newRecord(
					this.scaleId ? this.scaleId : `newScale${new Date().getTime()}`,
					this.username ? this.username : 'unknown',
					this.queries[this.queryIndex].content,
					params.value
				);
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
					this.postPermission = true;
				}, loadingAnimationTime);
			}
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

.dialog-image {
	max-height: 200rpx;
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
