# Words & Categories Management in Laravel

Words and Categories in this Laravel application are structured to support multi-user functionality. Each word belongs to multiple categories, and each category contains multiple words. Additionally, each word has a field storing the user ID who registered it. Words and categories also maintain a many-to-many relationship with teams, allowing each team to manage its own vocabulary and classification.

## Words Management
Each word is associated with a user and can belong to multiple categories.

### Implementation:
- Define a `Word` model and migration:
   ```sh
   php artisan make:model Word -m
   ```
- Create the `words` table migration:
   ```php
   public function up()
   {
       Schema::create('words', function (Blueprint $table) {
           $table->id();
           $table->string('word');
           $table->foreignId('user_id')->constrained()->onDelete('cascade');
           $table->timestamps();
       });
   }
   ```
- Define relationships in the `Word` model:
   ```php
   public function user()
   {
       return $this->belongsTo(User::class);
   }

   public function categories()
   {
       return $this->belongsToMany(Category::class);
   }

   public function teams()
   {
       return $this->belongsToMany(Team::class);
   }
   ```

## Categories Management
Categories group multiple words and maintain relationships with users and teams.

### Implementation:
- Define a `Category` model and migration:
   ```sh
   php artisan make:model Category -m
   ```
- Create the `categories` table migration:
   ```php
   public function up()
   {
       Schema::create('categories', function (Blueprint $table) {
           $table->id();
           $table->string('name');
           $table->foreignId('user_id')->constrained()->onDelete('cascade');
           $table->timestamps();
       });
   }
   ```
- Define relationships in the `Category` model:
   ```php
   public function user()
   {
       return $this->belongsTo(User::class);
   }

   public function words()
   {
       return $this->belongsToMany(Word::class);
   }

   public function teams()
   {
       return $this->belongsToMany(Team::class);
   }
   ```

## Team Association
Words and categories are also linked to teams, allowing collaborative vocabulary management.

### Implementation:
- Create pivot tables for words-teams and categories-teams relationships:
   ```sh
   php artisan make:migration create_team_word_table --create=team_word
   php artisan make:migration create_team_category_table --create=team_category
   ```
- Define pivot table migrations:
   ```php
   public function up()
   {
       Schema::create('team_word', function (Blueprint $table) {
           $table->id();
           $table->foreignId('team_id')->constrained()->onDelete('cascade');
           $table->foreignId('word_id')->constrained()->onDelete('cascade');
           $table->timestamps();
       });

       Schema::create('team_category', function (Blueprint $table) {
           $table->id();
           $table->foreignId('team_id')->constrained()->onDelete('cascade');
           $table->foreignId('category_id')->constrained()->onDelete('cascade');
           $table->timestamps();
       });
   }
   ```

## Conclusion
This structure enables users to manage their words and categories efficiently while ensuring teams can have distinct word sets and categories. The many-to-many relationships provide flexibility for organizing and retrieving words based on user, category, or team contexts.
