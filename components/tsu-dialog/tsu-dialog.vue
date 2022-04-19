<template>
	<view class="bubble" :class="{ rightBubble: direction === 'right' }">
		<view class="message" :class="{ left: direction === 'left', right: direction === 'right' }">
			<slot style="float: left;"></slot>
			<!-- 下面注释的一行是提供修改的icon button，目前无功能先注释 -->
			<!-- <view v-if="direction === 'right'" style="margin-left: 8rpx;"><uni-icons type="compose" color="white" size="20"></uni-icons></view> -->
		</view>
	</view>
</template>

<script>
export default {
	name: 'tsu-dialog',
	data() {
		return {};
	},
	props: {
		direction: {
			type: String,
			default: 'left'
		}
	}
};
</script>

<style>
.bubble {
	display: flex;
	flex-direction: row;
	margin: 30rpx;
}

.rightBubble {
	justify-content: flex-end;
}

.message {
	padding: 20rpx;
	width: fit-content;
	background: transparent;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px 0px;
	display: flex;
	flex-direction: row;
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
	max-width: 50vw;
}

.left {
	background-color: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 0;
}

.right {
	background-color: #2ebfab;
	border-radius: 20rpx 20rpx 0 20rpx;
	color: white;
	text-align: right;
}
</style>
