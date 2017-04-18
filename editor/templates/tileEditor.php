<form class="tileEditor">

    <div class="input_wrapper">

        <label for="input_sprite">Sprite: </label>

        <div class="sprite_select_wrapper">
            <script id="tpl_spriteSelect" type="text/template">
                <select id="input_sprite" required>
                    <option disabled selected value="default">Select a sprite</option>
                    <%
                    _.each(
                        sprites,
                        function(sprite, i, list){
                            %>
                            <option value="<%= sprite.get('id') %>"><%= sprite.get('source') %></option>
                            <%
                        }
                    );
                    %>
                </select>
            </script>
        </div>

    </div>

    <div class="input_wrapper">
        <label for="input_submit">Create new tile: </label>
        <input type="submit" id="input_submit" name="input_submit" value="Create tile"/>
    </div>

    <div class="input_wrapper deleteTile_wrapper" style="display: none">
        <label for="input_delete">Delete this tile: </label>
        <input type="submit" id="input_delete" name="input_delete" value="Delete tile"/>
    </div>
</form>