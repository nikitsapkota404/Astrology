const convertTime = time => {
    const timeParts = time.split(':');
    let hours = parseInt(timeParts[0]);
    let minutes = timeParts[1];

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    return `${hours}:${minutes} ${ampm}`;
};

export default convertTime;
