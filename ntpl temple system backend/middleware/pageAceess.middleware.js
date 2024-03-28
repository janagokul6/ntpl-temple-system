function handlePageAccess(name, process) {
  try {
    return function (req, res, next) {
      if (req.user.userData.role.includes("superadmin")) {
        return next();
      } else {
        if (req.user.userData.role[0]) {
          if (req.user.userData.role[0][name]) {
            if (req.user.userData.role[0][name].includes(process)) {
              return next();
            }
          }
        }
      }
      return res.status(400).json({ message: "error", detail: "eccess_error" });
    };
  } catch (error) {
    return res.status(400).json({ message: "error", detail: "eccess_error" });
  }
}

module.exports = handlePageAccess;
