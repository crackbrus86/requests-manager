import moment from "moment";

export function getDateValue(value, format = "YYYY-MM-DD") {
  return !!value && moment.isMoment(value) && moment(value).isValid()
    ? value.format(format)
    : null;
}
