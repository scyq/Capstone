<template>
	<view class="welcome">
		<image class="bg" src="../../static/welcome.png"></image>
		<view class="txt">
			<view class="intro-txt">我们是清华大学积极心理计算实验室</view>
			<view class="promise">
				<view class="promise-txt">接下来采集的内容将会用于心理学研究</view>
				<view class="promise-txt">我们将会严格遵守实验规范</view>
				<view class="promise-txt">保证信息安全</view>
			</view>
		</view>
		<button class="btn" @click="start()">{{ showButton ? '开始' : '返回' }}</button>
	</view>
</template>

<script>
export default {
	onShow() {
		const pages = getCurrentPages();
		const lastPage = pages[pages.length - 2];
		this.showButton = lastPage ? false : true;
	},
	data() {
		return {
			showButton: true
		};
	},
	methods: {
		start() {
			uni.navigateTo({
				url: '../index/index'
			});
		}
	}
};
</script>

<style>
.welcome {
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.bg {
	position: fixed;
	top: 0;
	width: 100vw;
	height: 60vh;
}

.txt {
	position: fixed;
	top: 65vh;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.intro-txt {
	font-size: 38rpx;
	font-weight: 400;
}

.promise {
	margin-top: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.promise-txt {
	margin: 4rpx;
	font-size: 30rpx;
	color: rgba(112, 112, 112, 0.68);
}

.btn {
	position: fixed;
	top: 80vh;
	width: 80vw;
	height: 100rpx;
	border-radius: 80rpx;
	background: linear-gradient(149.48deg, #2cb9b0 2.55%, #38ef7d 225.34%);
	color: #ffffff;
}
</style>
