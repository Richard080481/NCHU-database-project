const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const today = `${year}-${(month+1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
const thisMonth = `${year}-${(month+1).toString().padStart(2, '0')}`