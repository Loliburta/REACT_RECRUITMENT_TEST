// Sets the correct form of word "sztuk" up to a 1000

export const AdjustText = (count, setText) => {
  if (count === 0) {
    setText("Obecnie masz 0 sztuk produktu");
  } else if (count === 1) {
    setText("Obecnie masz 1 sztukę produktu");
  } else if (count < 5) {
    setText(`Obecnie masz ${count} sztuki produktu`);
  } else if (count < 21) {
    setText(`Obecnie masz ${count} sztuk produktu`);
  } else if (count > 111 && count < 115) {
    setText(`Obecnie masz ${count} sztuk produktu`);
  } else {
    let cnt = count % 10;
    if (cnt > 1 && cnt < 5) {
      setText(`Obecnie masz ${count} sztuki produktu`);
    } else {
      setText(`Obecnie masz ${count} sztuk produktu`);
    }
  }
};
