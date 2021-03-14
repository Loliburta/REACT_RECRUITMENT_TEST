// Sets style of buttons(+ -) so it's visibly unclickable if you have max or min ammount of an item

export const AdjustButton = (min, max, count, setButtonClass) => {
  if (count === min) {
    setButtonClass({
      plus: "counter__button",
      minus: "counter__button--disabled",
    });
  } else if (count === max) {
    setButtonClass({
      plus: "counter__button--disabled",
      minus: "counter__button",
    });
  } else if (count === min + 1 && count !== max) {
    setButtonClass({
      plus: "counter__button",
      minus: "counter__button",
    });
  } else if (count === max - 1 && count !== min) {
    setButtonClass({
      plus: "counter__button",
      minus: "counter__button",
    });
  }
};
