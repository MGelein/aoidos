# What happens
1. You enter a location. You get a description.
2. You act.
3. Things happen. You act > Things happen > etc..

# Game interaction
save/load/sound/

# Actions
i	investigate, inspect,examine[Object/Location]		more information on an object or location (if used without param).			"inspect chest" => "That's a a nice chest"
m	move(to), walk, run, skip	[Direction/Location]	move into a direction to new location or goto the specified location. 		"move north" => "As you go north...."
e	enter						[Location]				enter a specified location. Locations are highlighted in the description	"enter pub" => "The sound of beer..."
l	leave/exit					[Location]				exit a specified location. Go back where you came from.						"exit pub" => "You shut the door and walk..."
a	attack						[Object/NPC]			attacks your current target with your weapon.								"attack" => "You hit goblin for 4 damage"
t	talk/threaten/whisper/say	[Object/NPC]			enter conversation with an NPC												"talk gobrol" => "Hi there Gobrol"
-	inventory					[...]					opens the inventory, shows you a list of items and equipment				"inventory" => 1 sword \n 500 gold \n...
u	use							[Object]				uses the object in the location on or the optional second object			"use key" => "The door opened"
-	take/harvest/get/			[Object]				attempt to lift and take object in inventory								"take flower" => "You pick the flower"

# Conversation
Topics in conversation are highlighted. E.g: (You can also click these topics to talk about them)

	"There was this horrible <raid> last friday"
	> raid
	"Yes the raid was horrible. What about it?"

Sometimes the user is presented with multiple choice questions. E.g:

	"What would you like to do:"
	"1. Nothing"
	"2. Maybe something"
	"3. Attack you"
	> 3
	"YOU WANT TO ATTACK ME?!"
	
# Location
Each location is in its own file. Will be loaded using ajax on demand. Maybe preload locations around the player
for swift response, or just load when the user enters them. When the user enters a location a description appears
that describes what is visible and the atmosphere / people. After first visit the description is more terse but can be expanded by inspecting.

#NPC 
Each NPC has its own file. Same loading idea as locations. NPC's can be inspected and have conversation. Also can be attacked.

