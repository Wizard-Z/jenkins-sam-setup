
exports.handler = async function (event) {
  console.log("Processing received event, Step function invoked", { event });


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
