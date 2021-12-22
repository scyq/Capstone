<template>
	<view class="answer">
		<view class="textfield" v-if="answerWidgets.type === 'textfield'">
			<u--input style="margin-right: 40rpx;" placeholder="请输入内容" border="surround" v-model="value" @change="changeValue"></u--input>
			<uni-icons type="paperplane" size="30" @click="nextDialog"></uni-icons>
		</view>
		<view class="flex-row" v-else-if="answerWidgets.type === 'buttons'">
			<u-button v-for="(btn, index) of answerWidgets.widgets" type="primary" :text="btn" :key="index" @click="clickBtn(btn)"></u-button>
		</view>
		<view class="flex-row" v-else-if="answerWidgets.type === 'date'">
			<uni-calendar ref="calendar" :insert="false" @confirm="confirmCalendar" />
			<uni-icons type="calendar" size="30" @click="openCalendar"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tsu-answer',
	data() {
		return {
			value: '',
		};
	},
	props: {
		answerWidgets: {
			type: Object,
			default: () => {
				return {
					type: 'textfield',
					widgets: null
				};
			}
		}
	},
	methods: {
		confirmCalendar(e) {
			this.value = e.fulldate;
			this.nextDialog();
		},
		openCalendar() {
			this.$refs.calendar.open();
		},
		clickBtn(text) {
			this.value = text;
			this.nextDialog();
		},
		changeValue(e) {
			this.value = e;
		},
		nextDialog() {
			this.$emit('nextDialog', this.value);
		}
	},
	computed: {}
};
</script>

<style>
.answer {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	position: fixed;
	bottom: 0;
	z-index: 99;
	width: 100vw;
	height: 160rpx;
}

.flex-row {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.textfield {
	width: 80%;
	display: flex;
	flex-direction: row;
	align-items: center;
}
</style>
