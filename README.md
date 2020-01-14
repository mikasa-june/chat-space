##usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|password|string|null: false|
|email|string|null: false|
### Association
- has_many: comments
- has_many: groups, through:  :posts_tags

##commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|string|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

##groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :groups_users
- has_many :users, through:  :posts_tags