// const checkEditableFields = (call, callback, next) => {
//   const updatingFields = Object.keys(request);
//   const allowedUpdates = [
//     'name',
//     'description',
//     'origin',
//     'category_id',
//     'image',
//     'recipe'
//   ];
//   const isValidOperation = updatingFields.every(field =>
//     allowedUpdates.includes(field)
//   );
//   if (!isValidOperation) throw new Error('This field can not be updated!');
//   if (!id) throw new Error('Please provide meal ID');
//   next();
// };

// module.exports = {
//   checkEditableFields
// };
