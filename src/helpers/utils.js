export const extractId = (url) => {
    let id = url.split("/").slice(-1)[0];

    return id;
};

export const getFormattedDate = (data) => {
    let toReturn = "";
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];

    let date = new Date(data);
    console.log(date.getMonth(), date.getDate(), date.getFullYear());
    toReturn = `${date.getDate()} ${
        months[date.getMonth() - 1]
    }, ${date.getFullYear()}`;
    return toReturn;
};

export const capitaliseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
