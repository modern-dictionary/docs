# Authentication in Laravel

Authentication in Laravel is a robust system that includes multiple security features such as Google reCAPTCHA, Two-Factor Authentication (2FA), and Password Reset via Email. Below, we will go through each authentication feature used in this project.

## Google reCAPTCHA

To prevent automated bots from abusing authentication and registration forms, we integrate Google reCAPTCHA.

### Implementation Steps:
1. Register your site on [Google reCAPTCHA](https://www.google.com/recaptcha) and obtain API keys.
2. Configure reCAPTCHA keys in the Laravel `.env` file:
   ```
   RECAPTCHA_SITE_KEY=your-site-key
   RECAPTCHA_SECRET_KEY=your-secret-key
   ```
3. Install the Google reCAPTCHA validation package (if needed):
   ```sh
   composer require google/recaptcha
   ```
4. Implement reCAPTCHA validation in the authentication controller:
   ```php
   use Illuminate\Support\Facades\Http;

   public function verifyRecaptcha($token)
   {
       $response = Http::post('https://www.google.com/recaptcha/api/siteverify', [
           'secret' => env('RECAPTCHA_SECRET_KEY'),
           'response' => $token,
       ]);

       return $response->json()['success'];
   }
   ```

## Two-Factor Authentication (2FA)

Two-Factor Authentication enhances security by requiring users to enter a temporary code sent via email or an authenticator app.

### Implementation Steps:
1. Install Laravel Fortify (if not already installed):
   ```sh
   composer require laravel/fortify
   ```
2. Enable 2FA in `config/fortify.php`:
   ```php
   'features' => [
       Features::twoFactorAuthentication(),
   ],
   ```
3. Run migrations to enable the `two_factor_secret` column:
   ```sh
   php artisan migrate
   ```
4. Allow users to enable/disable 2FA in their account settings.
5. Generate and verify OTP (One-Time Password) using Google Authenticator or an SMS service.

## Password Reset (Forgot Password via Email)

Laravel provides a built-in mechanism to allow users to reset their passwords using email verification.

### Implementation Steps:
1. Configure mail settings in `.env`:
   ```
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USERNAME=your-username
   MAIL_PASSWORD=your-password
   MAIL_ENCRYPTION=tls
   ```
2. Use Laravel's built-in password reset feature:
   ```sh
   php artisan make:auth
   ```
3. Add routes in `routes/web.php`:
   ```php
   Route::get('forgot-password', [PasswordResetController::class, 'showLinkRequestForm']);
   Route::post('forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
   ```
4. Laravel will automatically handle sending the reset link to the user's email.

## Conclusion

By implementing Google reCAPTCHA, Two-Factor Authentication, and Password Reset via Email, we ensure that our authentication system in Laravel remains secure and user-friendly.
