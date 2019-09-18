'use strict';

const status = require('http-status');
const { to } = require('await-to-js');


module.exports = ({ accountRepository: Account, amqp }) => {

  const findMyProfile = async (req, res, next) => {
    const [ err, account ] = await to(Account.findById({ _id: req.user._id }));

    if (err) return next(err);

    res.send({ profile: account });
  }

  const putMyProfile = async (req, res, next) => {
    const [ err ] = await to(Account.update(req.body));
    if (err) return next(err);

    res.end();
  }

  const remove = async (req, res, next) => {
    const [ err ] = await to(Account.remove({ _id: req.user._id }));
    if (err) return next(err);

    amqp.sendToQueue({ queue: 'account-service', msg: {
      event: 'REMOVE_ACCOUNT',
      data: { _id }
    }});

    res.end();
  }

  const removeMany = async (req, res, next) => {
    const { _ids } = req.body;
    const [ err ] = await to(Account.removeMany({ _ids }));
    if (err) return next(err);

    for (let id of _ids) {
      amqp.sendToQueue({ queue: 'account-service', msg: {
        event: 'REMOVE_ACCOUNT',
        data: { _id }
      }});
    }

    res.end();
  }

  const newEmailVerifyKey = async (req, res, next) => {
    const { _id, username } = req.body;
    const [ err, { email, verifyEmailKey } ] = await to(Account.newEmailVerifyKey({ _id, username }));
    if (err) return next(err);

    // sendEmail

    if (!email)
      return res.send({
        message: 'EMAIL_NOT_PROVIDED'
      });

    res.end();
  }

  const verifyEmail = async (req, res, next) => {
    const { _id, key } = req.body;
    const [ err, result ] = await to(Account.verifyEmail({ _id, key }));
    if(err) return next(err);

    if (!result)
      return res.send({
        message: 'COULD_NOT_VERIFY'
      });

    res.end();
  }

  const resetPassword = async (req, res, next) => {
    const { username, password, key } = req.body;
    const [ err, result ] = await to(Account.resetPassword({ username, password, key }));
    if (err) return next(err);

    if (!result)
      return res.send({
        message: 'COULD_NOT_VERIFY'
      });

    res.end();
  }

  const findByUsername = async (req, res, next) => {
    const { username } = req.body;
    const [ err, account ] = await to(Account.findByUsername({ username }));
    if (err) return next(err);

    res.send({ account });
  }

  const patchPassword = async (req, res, next) => {
    const { password } = req.body;
    const [ err, result ] = await to(Account.updatePasswordById({ password, _id: req.user._id }));
    if (err) return next(err);

    res.end();
  }

  const patchEmail = async (req, res, next) => {
    const { email } = req.body;
    const [ err ] = await to(Account.updateEmailById({ _id: req.user._id, email }));
    if (err) return next(err);

    amqp.sendToQueue({ queue: 'account-service', msg: {
      event: 'UPDATE_EMAIL',
      data: { _id, email }
    }});

    res.end();
  }

  const findRoles = async (req, res, next) => {
    const [ err, roles ] = await to(Account.findRolesById({ _id: req.user._id }));
    if (err) return next(err);

    res.send({ roles });
  }

  const sendFrReq = async (req, res, next) => {
    const { target_id } = req.params;
    const sender_id = req.user._id;

    const [ err ] = await to(Account.sendFrReq({ sender_id, target_id }));

    res.end();
  }

  const findSentFrReqs = async (req, res, next) => {
    const [ err, sentFriendRequests ] = await to(Account.findSentFrReqs({ _id: req.user._id }));
    if (err) return next(err);

    res.send({ sentFriendRequests });
  }


  const removeSentFrReq = async (req, res, next) => {
    const { target_id } = req.params;
    const sender_id = req.user._id;

    const [ err, friendRequests ] = await to(Account.removeFrReq({ sender_id, target_id }));
    if (err) return next(err);

    res.end();
  }

  const findFrReqs = async (req, res, next) => {
    const [ err, friendRequests ] = await to(Account.findFrReqs({ _id: req.user._id }));
    if (err) return next(err);

    res.send({ friendRequests });
  }

  const acceptFrReq = async (req, res, next) => {
    const { sender_id } = req.params;
    const target_id = req.user._id;

    const [ err ] = await to(Account.acceptFrReq({ sender_id, target_id }));
    if (err) return next(err);

    amqp.sendToQueue({ queue: 'account-service', msg: {
      event: 'ADD_FRIEND',
      data: { sender_id, target_id }
    }});

    res.end();
  }

  const removeFrReq = async (req, res, next) => {
    const { sender_id } = req.params;
    const target_id = req.user._id;

    const [ err ] = await to(Account.removeFrReq({ sender_id, target_id }));
    if (err) return next(err);

    amqp.sendToQueue({ queue: 'account-service', msg: {
      event: 'REMOVE_FRIEND',
      data: { sender_id, target_id }
    }});

    res.end();
  }

  return {
    findMyProfile,
    putMyProfile,
    remove,
    removeMany,
    newEmailVerifyKey,
    verifyEmail,
    findByUsername,
    resetPassword,
    findRoles,
    patchPassword,
    patchEmail,
    findSentFrReqs,
    sendFrReq,
    removeSentFrReq,
    findFrReqs,
    acceptFrReq,
    removeFrReq
  }
}

