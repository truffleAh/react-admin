/* Date()库的时间格式转换 */

const transfer = (number) => {
  return number < 10 ? "0" + number : "" + number;
};

const getTime = (dateInstance) => {
  const year = dateInstance.getFullYear();
  const month = dateInstance.getMonth() + 1;
  const date = dateInstance.getDate();
  const hour = dateInstance.getHours();
  const minute = dateInstance.getMinutes();
  const second = dateInstance.getSeconds();
  return (
    [year, month, date].map(transfer).join("-") +
    " " +
    [hour, minute, second].map(transfer).join(":")
  );
};

export const formatTime = (time) => {
  //接收Date实例
  if (time instanceof Date) {
    return getTime(time);
  }
};
