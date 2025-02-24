
---
# Security & Best Practices

Security is critical for any application. Here are the best practices implemented in Modern Dictionary to ensure a secure environment.

## Authentication & Authorization
We use **JWT (JSON Web Tokens)** for authentication. After logging in, users receive a token that is used to verify their identity in subsequent API requests.

### Token-based Authentication
- When the user logs in, they receive a **JWT**.
- The frontend includes this token in the Authorization header for protected routes.
- The backend verifies the token before granting access to sensitive data.

## Two-Factor Authentication (2FA)

::: tip 2FA Security
To enhance security, we implement **2FA (Two-Factor Authentication)**, requiring users to verify their identity with an additional factor besides their password.
:::

### 2FA Implementation Steps:
1. Users enable 2FA in their profile settings.
2. A unique code is generated and sent via email or an authentication app.
3. Users must enter the code during login to complete authentication.

## Google reCAPTCHA

::: info Bot Protection
To prevent bot attacks, we use **Google reCAPTCHA** in login and signup forms.
:::

### reCAPTCHA Integration:
- The frontend includes Google's **reCAPTCHA v2/v3** widget.
- On form submission, the reCAPTCHA token is verified with Google’s API.
- If verification fails, the request is rejected to prevent bot interactions.

### Example of reCAPTCHA Validation in Laravel:
```php
public function validateRecaptcha(Request $request)
{
    $response = Http::post('https://www.google.com/recaptcha/api/siteverify', [
        'secret' => env('RECAPTCHA_SECRET_KEY'),
        'response' => $request->recaptcha_token,
    ]);
    
    if (!$response->json()['success']) {
        return response()->json(['message' => 'reCAPTCHA verification failed'], 403);
    }
    
    return response()->json(['message' => 'reCAPTCHA verification successful']);
}
```
---