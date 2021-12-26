const calendar = {
  "title": {
    "year": 2022,
    "month": 1
  },
  "header": ["일", "월", "화", "수", "목", "금", "토"],
  "elements": [26, 27, 28, 29, 30, 31, ...[...Array(15).keys()].map(e => { return e+1 })],
  "disabled": [26, 27, 28, 29, 30, 31]
}

export default calendar;