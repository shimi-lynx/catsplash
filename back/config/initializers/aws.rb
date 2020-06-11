Aws.config.update({
  region: 'ap-northeast-1',
  credentials: Aws::Credentials.new(
    ENV['AWS_S3_ACCESS_KEY_ID'],
    ENV['AWS_S3_SECRET_ACCESS_KEY']
  ),
})

S3_BUCKET = Aws::S3::Resource.new.bucket('shimi-lynx-cat')
