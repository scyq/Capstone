const host = "http://47.112.121.228:8000"

export async function newRecord(scaleId, time, school, grade, classId, name, question, answer) {
	const res = await uni.request({
		url: host + "/newrecord/",
		method: "POST",
		data: {
			scale_id: scaleId,
			time,
			school,
			grade,
			class_id: classId,
			name,
			question,
			answer
		},
		success: (res) => {
			console.log(res);
		},
		fail: (res) => {
			console.log(res);
			newRecord(scaleId, time, school, grade, classId, name, question, answer);
		}
	});
	return res;
}
