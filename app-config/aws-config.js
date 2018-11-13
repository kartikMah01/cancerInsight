// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
var aws_app_analytics = 'enable';
var aws_cognito_identity_pool_id = 'us-east-1:99ab7db6-44d0-41fb-83af-d1d5ca8054fd';
var aws_cognito_region = 'us-east-1';
var aws_content_delivery = 'enable';
var aws_content_delivery_bucket = 'cancerinsights-hosting-mobilehub-613253969';
var aws_content_delivery_bucket_region = 'us-east-1';
var aws_content_delivery_cloudfront = 'enable';
var aws_content_delivery_cloudfront_domain = 'd1iedcca6v8ixb.cloudfront.net';
var aws_mobile_analytics_app_id = '5751a7f0fadf4ab1a1dd46d4e5bdc352';
var aws_mobile_analytics_app_region = 'us-east-1';
var aws_project_id = '921c051c-7596-43df-8d2f-25ff32680577';
var aws_project_name = 'cancerInsights-2018-11-12-12-01-53';
var aws_project_region = 'us-east-1';
var aws_resource_name_prefix = 'cancerinsights-mobilehub-613253969';

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws_cognito_identity_pool_id
  }, {
    region: aws_cognito_region
  });
AWS.config.update({customUserAgent: 'MobileHub v0.1'});