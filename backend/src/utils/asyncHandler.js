// const asyncHandler = (handler) => {
//   return (req, res, next) => {
//     Promise.resolve(handler(req, res, next)).catch(next);
//   };
// };

// export default asyncHandler;



const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      console.error("========== ERROR ==========");
      console.error(err);
      console.error(err.stack);
      console.error("===========================");
      next(err);
    }
  };
};

export default asyncHandler;