from .base import *

DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = config(
    'ALLOWED_HOSTS',
    default='capbraco.com,www.capbraco.com',
    cast=lambda v: [s.strip() for s in v.split(',')]
)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('PGDATABASE'),
        'USER': config('PGUSER'),
        'PASSWORD': config('PGPASSWORD'),
        'HOST': config('PGHOST'),
        'PORT': config('PGPORT', default='5432'),
    }
}

CORS_ALLOWED_ORIGINS = config(
    'ALLOWED_ORIGINS',
    default='https://capbraco.com',
    cast=lambda v: [s.strip() for s in v.split(',')]
)

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

AWS_ACCESS_KEY_ID = config('CLOUDFLARE_R2_ACCESS_KEY')
AWS_SECRET_ACCESS_KEY = config('CLOUDFLARE_R2_SECRET_KEY')
AWS_STORAGE_BUCKET_NAME = config('CLOUDFLARE_R2_BUCKET_NAME')
AWS_S3_ENDPOINT_URL = f"https://{config('CLOUDFLARE_ACCOUNT_ID')}.r2.cloudflarestorage.com"
AWS_S3_REGION_NAME = 'auto'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True
