<template>
	<view class="answer">
		<view class="textfield" v-if="answerWidgets.type === 'textfield'">
			<u--input style="margin-right: 40rpx; border: 1.12801px solid #efeff4;" placeholder="请输入..." border="surround" v-model="value" @change="changeValue"></u--input>
			<uni-icons type="paperplane" size="30" @click="nextDialog"></uni-icons>
		</view>
		<view class="flex-row" v-else-if="answerWidgets.type === 'buttons'">
			<u-button class="btn" v-for="(btn, index) of answerWidgets.widgets" type="primary" :text="btn" :key="index" @click="clickBtn(btn)"></u-button>
		</view>
		<view class="flex-row" v-else-if="answerWidgets.type === 'date'">
			<uni-calendar ref="calendar" :insert="false" @confirm="confirmCalendar" />
			<uni-icons type="calendar" size="30" @click="openCalendar"></uni-icons>
		</view>
		<view class="flex-row slider" v-else-if="answerWidgets.type === 'numberSelection'">
			<slider style="width: 100%;" :min="answerWidgets.widgets[0]" :max="answerWidgets.widgets[1]" @change="sliderChange" step="1" show-value="true" :value="1" />
			<uni-icons type="paperplane" size="30" @click="nextDialog"></uni-icons>
		</view>
		<view v-else-if="answerWidgets.type === 'city'">
			<view v-if="citySelector" class="whiteMask"><t-index-address class="citySelector" @select="selectCity"></t-index-address></view>
			<uni-icons type="location" size="30" @click="openCitySelector"></uni-icons>
		</view>
		<view class="flex-row" v-else-if="answerWidgets.type === 'numberInput'">
			<uni-number-box :min="answerWidgets.widgets[0]" :max="answerWidgets.widgets[1]" :value="answerWidgets.widgets[2]" @change="numberInputChange"></uni-number-box>
			<uni-icons type="paperplane" size="30" @click="nextDialog"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tsu-answer',
	data() {
		return {
			value: '',
			citySelector: false
		};
	},
	props: {
		answerWidgets: {
			type: Object,
			default: () => {
				return {
					text: 'default',
					type: 'textfield',
					widgets: null,
					side: null
				};
			}
		}
	},
	methods: {
		afterOption() {
			this.value = '';
		},
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
			let res = { value: this.value };
			if (this.answerWidgets.side) {
				if (this.answerWidgets.side[this.value]) {
					res.side = this.answerWidgets.side[this.value];
				}
			}
			this.afterOption();
			this.$emit('nextDialog', res);
		},
		sliderChange(e) {
			this.value = e.detail.value;
		},
		numberInputChange(e) {
			this.value = e;
		},
		selectCity(data) {
			this.value = `${data.province} ${data.name}`;
			this.citySelector = false;
			this.nextDialog();
		},
		openCitySelector() {
			this.citySelector = true;
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
	background: transparent;
	position: fixed;
	bottom: 0;
	z-index: 99;
	width: 100vw;
	height: 18vh;
}

.btn {
	background-color: #ffffff;
	color: #000000;
	border: none;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	max-width: 100px;
	flex: 1;
}

.flex-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	justify-content: center;
}

.textfield {
	width: 80%;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.slider {
	width: 70%;
}

.whiteMask {
	position: fixed;
	top: 0;
	background: white;
	width: 100vw;
	height: 100vh;
}

.citySelector {
	display: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
}
</style>
