export function timeSpan(timestamp) {
    const timestampDate = new Date(+timestamp);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "October",
        "November",
        "December"
    ];

    const timeText = [
        {
            value: Date.now(),
            text: "только что"
        },
        {
            value: new Date().setMinutes(new Date().getMinutes() - 1),
            text: "1 минуту назад"
        },
        {
            value: new Date().setMinutes(new Date().getMinutes() - 5),
            text: "5 минут назад"
        },
        {
            value: new Date().setMinutes(new Date().getMinutes() - 10),
            text: "10 минут назад"
        },
        {
            value: new Date().setMinutes(new Date().getMinutes() - 30),
            text: "30 минут назад"
        },
        {
            value: new Date().setHours(0, 0, 0, 0),
            text: `вчера в ${timestampDate.getHours()} : ${timestampDate.getMinutes()}`
        },
        {
            value: new Date().setDate(new Date().getDate() - 1),
            text: `${timestampDate.getDate()}  ${
                months[timestampDate.getMonth()]
            }`
        },
        {
            value: new Date().setMonth(new Date().getMonth() - 1),
            text: `${timestampDate.getDate()}  ${
                months[timestampDate.getMonth()]
            }  ${timestampDate.getFullYear()}`
        }
    ];

    let result;
    timeText.forEach((id) => {
        if (timestamp <= id.value) {
            result = id.text;
        }
    });

    return result;
}
