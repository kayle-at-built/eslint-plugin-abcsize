function a0b1c21() {
  // 1
  if (null) {
  }

  // 2
  if (null) {
  } else {
  }


  // 3
  null || undefined || false;

  // 4
  1 < 2 < 3 > 2 > 1;

  // 1
  1 < 2 ? true : false;

  // 2
  1 < 2 < 3 ? true : false;

  // 1
  global.catch();

  // 1
  try {
  } finally {
  }

  // 2
  try {
  } catch (e) {
  }

  // 4
  switch(1) {
    case 1:
    case 2:
    case 3:
    default:
      break;
  };
}
