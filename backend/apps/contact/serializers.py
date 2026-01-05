from rest_framework import serializers

class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(required=True)
    message = serializers.CharField(required=True)

    def validate_message(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long")
        return value
