const auditLogPolicy = {
  version: "1.0.0",
  init: function (pluginContext) {
    pluginContext.registerPolicy({
      name: "audit-log",
      policy: (_params) => async (req, res, next) => {
        try {
          const startTime = Date.now();

          const requestLog = {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body,
            timestamp: new Date().toISOString(),
          };

          const originalSend = res.send;

          res.send = function (body) {
            let modifiedBody = body;
            if (typeof body === "object") {
              modifiedBody = { ...body, extraData: "additional info" };
            }

            originalSend.call(this, modifiedBody);

            const duration = Date.now() - startTime;
            const responseLog = {
              statusCode: res.statusCode,
              duration,
              body: modifiedBody,
            };

            const logEntry = {
              request: requestLog,
              response: responseLog,
            };

            console.log({ logEntry });
          };
          next();
        } catch (error) {
          return res.status(StatusCodes.BAD_GATEWAY).send({
            success: false,
            message: error.message,
          });
        }
      },
    });
  },
};

module.exports = auditLogPolicy;
