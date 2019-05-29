import moment from "moment";

function CalcYearOld(birthDate) {
  return moment().diff(birthDate, 'years', false);
}

function CalcNoHousePeriod(noticeDate, birthDate, marryDate, noHouseDate) {
  // 현재 만 나이
  let yearOld = CalcYearOld(birthDate);

  // 만 30세가 됬을때의 당해
  let m30Years = moment(birthDate);
  m30Years.add(30, 'years');

  let mNoticeDate = moment(noticeDate);
  let mMarryDate = marryDate === '' ? null : moment(marryDate);
  let mNoHouseDate = noHouseDate === '' ? null : moment(noHouseDate);

  let mStartDate = null;

  if (yearOld >= 30) {
    if (mMarryDate !== null && mNoHouseDate === null) {
      mStartDate = mMarryDate;
    } else if (mMarryDate !== null && mNoHouseDate !== null) {
      mStartDate = mMarryDate.diff(mNoHouseDate, 'days') >= 0 ? mMarryDate : mNoHouseDate;
    } else if (mMarryDate === null && mNoHouseDate === null) {
      mStartDate = m30Years;
    } else if (mMarryDate !== null && mNoHouseDate === null) {
      mStartDate = mMarryDate.diff(m30Years, 'days') >= 0 ? m30Years : mMarryDate;
    } else if (mMarryDate === null && mNoHouseDate !== null) {
      mStartDate = mNoHouseDate.diff(m30Years, 'days') >= 0 ? mNoHouseDate : m30Years;
    }
  }

  // 무주택기간이 아님.
  if (mStartDate === null) {
    return 0 + '일';
  }
  
  let duration = moment.duration(mNoticeDate.diff(mStartDate));
  return duration.years() + '년 ' + duration.months() + '개월 ' + duration.days() + '일';
}

export { CalcYearOld, CalcNoHousePeriod };