# PS5 Hunter
It's really hard to get your hands on a PS5 these days. So I wrote this lambda function to publish a message to an AWS SNS topic whose subscriber is my SMS number. The lambda is invoked every two minutes.
Infrastructure code is omitted, I did this really quick with the UI console.

Steps
- Create IAM policy
- Create SNS Topic and Subscription
- Create Eventbridge Schedule
- Create Lambda Function
