const host = "http://47.112.121.228:8000"

export function newRecord(scale_id, username, question, answer) {
	uni.request({
		url: host + "/newrecord/",
		method: "POST",
		data: {
			scale_id,
			username,
			question,
			answer
		},
		success: (res) => {
			console.log(res);
		},
		fail: (res) => {
			console.log(res);
		}
	})
}
