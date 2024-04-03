
exports.handler = async function (event) {
  console.log("Processing received event from stepfunction. EB to StepFunction to Lambda", { event });


  const result = {
    eventTransactionId: event.transactionId,
    responsePayload: event.message,   
    integrationName: "Event Consumer Service",
    loanApplicationNumber: event.loanApplicationNumber,
    productName: event.productName
  };
  console.log("Successfully processed received event", { result });
  return result;
};
