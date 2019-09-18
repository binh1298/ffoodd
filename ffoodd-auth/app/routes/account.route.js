'use strict';

const express = require('express');

module.exports = ({ accountController: controller }) => {
  const router = express.Router();

  /* PROFILE */
  router.get('/', controller.findMyProfile);

  router.put('/', controller.putMyProfile);

  router.delete('/:id', controller.remove);

  /* FRIEND REQUESTS */
	router.get('/sent-fr-reqs', controller.findSentFrReqs);

	router.patch('/sent-fr-reqs/:target_id', controller.sendFrReq);

	router.delete('/sent-fr-reqs/:target_id', controller.removeSentFrReq);

	router.get('/fr-reqs', controller.findFrReqs);

	router.patch('/fr-reqs/:sender_id', controller.acceptFrReq);

	router.delete('/fr-reqs/:sender_id', controller.removeFrReq);

	/* VERIFY */
	router.get('/verify', controller.newEmailVerifyKey);

  router.patch('/password', controller.patchPassword);

  router.patch('/email', controller.patchEmail);

  return router;
}
