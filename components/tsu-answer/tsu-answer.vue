<template>
	<view class="answer">
		<!-- textfield -->
		<view class="textfield" v-if="answerWidgets.type === 'textfield'">
			<input class="uni-input text-input" confirm-type="search" placeholder="请输入..." v-model="value" @input="changeValue" maxlength="-1"/>
			<image class="confirm-btn" src="../../static/arrow.svg" @click="nextDialog"></image>
		</view>
		<!-- buttons -->
		<view class="flex-row" v-else-if="answerWidgets.type === 'buttons'">
			<view v-if="singleButton" class="flex-row">
				<u-button class="common-btn btn" v-for="(btn, index) of answerWidgets.widgets" type="primary" :text="btn" :key="index" @click="clickBtn(btn)"></u-button>
			</view>
			<view v-else class="doubleRow">
				<view class="flex-row" v-for="(btns, index) of answerWidgets.newWidgets" :key="index">
					<u-button class="common-btn btn" v-for="(btn, i) of btns" type="primary" :text="btn" :key="i" @click="clickBtn(btn)"></u-button>
				</view>
			</view>
		</view>
		<!-- date -->
		<view class="flex-row" v-else-if="answerWidgets.type === 'date'">
			<uni-calendar ref="calendar" :insert="false" @confirm="confirmCalendar" />
			<uni-icons type="calendar" size="30" @click="openCalendar"></uni-icons>
		</view>
		<!-- number selection -->
		<view class="flex-row slider" v-else-if="answerWidgets.type === 'numberSelection'">
			<slider style="width: 100%;" :min="answerWidgets.widgets[0]" :max="answerWidgets.widgets[1]" @change="sliderChange" step="1" show-value="true" :value="0" />
			<image class="confirm-btn" src="../../static/arrow.svg" @click="nextDialog"></image>
		</view>
		<!-- city -->
		<view v-else-if="answerWidgets.type === 'city'">
			<view v-if="citySelector" class="whiteMask"><t-index-address class="citySelector" @select="selectCity"></t-index-address></view>
			<uni-icons type="location" size="30" @click="openCitySelector"></uni-icons>
		</view>
		<!-- number input -->
		<view class="flex-row" v-else-if="answerWidgets.type === 'numberInput'">
			<uni-number-box
				style="margin-right: 20rpx;"
				:min="answerWidgets.widgets[0]"
				:max="answerWidgets.widgets[1]"
				:value="answerWidgets.widgets[2]"
				@change="numberInputChange"
			></uni-number-box>
			<image class="confirm-btn" src="../../static/arrow.svg" @click="nextDialog"></image>
		</view>
		<!-- rating -->
		<view class="flex-row" v-else-if="answerWidgets.type === 'rating'">
			<u-button class="common-btn rating-btn" v-for="num of answerWidgets.widgets" type="primary" :text="num" :key="num" @click="clickBtn(num)"></u-button>
		</view>
		<!-- text selection with popup -->
		<view v-else-if="answerWidgets.type === 'textSelection'">
			<u-popup :show="popup" mode="bottom" round="20">
				<view class="text-selection">
					<checkbox-group @change="checkboxChange">
						<label class="checkbox-line" v-for="item in answerWidgets.widgets" :key="item">
							<view><checkbox :value="item" :checked="item.checked" /></view>
							<view>
								<span style="font-weight: bold;">{{ item.bold }}</span>
								<span>{{ item.normal }}</span>
							</view>
						</label>
					</checkbox-group>
					<button style="margin-bottom: 20rpx; background: #2EBFAB; color: white;" @click="confirmPopup">确认</button>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tsu-answer',
	data() {
		return {
			value: '',
			citySelector: false,
			popup: false,
			singleButton: true
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
	mounted() {},
	updated() {
		const popDelay = 2000; // 问题到弹窗的延时，单位ms
		if (this.answerWidgets.type !== 'textSelection') {
			this.popup = false;
		}


		if (this.answerWidgets.type === 'textSelection' && !this.popup) {
			console.log(1);
			setTimeout(() => {
				this.popup = true;
			}, popDelay);
		} else if (this.answerWidgets.type === 'buttons') {
			// 计算按钮总字数，判断是否需要排列两行
			let total_chars = 0;
			for (let text of this.answerWidgets.widgets) {
				total_chars += text.length;
			}
			this.singleButton = total_chars <= 14;
			if (!this.singleButton) {
				let temp = [];
				let len = this.answerWidgets.widgets.length;
				let half = Math.ceil(len / 2);
				temp.push(this.answerWidgets.widgets.slice(0, half));
				temp.push(this.answerWidgets.widgets.slice(half, len));
				this.answerWidgets.newWidgets = temp;
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
			this.value = e.tagert.value;
		},
		nextDialog() {
			let res = { value: this.value };
			if (this.answerWidgets.side) {
				if (this.answerWidgets.side[this.value]) {
					res.side = this.answerWidgets.side[this.value];
				}
			}
			if (this.answerWidgets.callback) {
				res.callback = this.answerWidgets.callback;
			}
			if (this.answerWidgets.judge) {
				res.judge = this.answerWidgets.judge;
				res.judgeCallback = this.answerWidgets.judgeCallback;
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
		},
		checkboxChange(e) {
			this.value = e.detail.value;
		},
		confirmPopup() {
			this.value = this.value
				.map(item => {
					let res = item.bold;
					if (item.normal) {
						res += item.normal;
					}
					return res;
				})
				.join(';');
			this.nextDialog();
			this.popup = false;
		}
	},
	computed: {}
};
</script>

<style>
.answer {
	padding-bottom: 40rpx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background: transparent;
	position: fixed;
	bottom: 0;
	z-index: 99;
	width: 100vw;
	height: 8vh;
}

.common-btn {
	background-color: #ffffff;
	color: #000000;
	border: none;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	margin: 5pxs;
}

.btn {
	max-width: 100px;
	flex: 1;
}

.confirm-btn {
	width: 60rpx;
	height: 60rpx;
}

.flex-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	justify-content: center;
}

.text-input {
	margin-right: 40rpx;
	border: 1.12801px solid #efeff4;
	background-color: #ffffff;
	padding: 20rpx;
	border-radius: 30rpx;
	min-width: 60vw;
}

.textfield {
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

.rating-btn {
	width: 80rpx;
	height: 80rpx;
	font-weight: bold;
}

.text-selection {
	overflow-y: scroll;
	padding: 50rpx;
	height: 90vh;
}

.uni-list-cell {
	justify-content: flex-start;
}

.checkbox-line {
	display: flex;
	flex-direction: row;
	margin: 30rpx;
}

.doubleRow {
	display: flex;
	flex-direction: column;
}
</style>
