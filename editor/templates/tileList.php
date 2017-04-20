<ul class="tileList">

    <script id="tpl_tileList" type="text/template">
        <li class="header">Tiles</li>

        <%
        if(screen == true){
            %>
            <li data-id="0">
                <img src="../public/img/sprites/blank.png"/>
            </li>
            <%
        }
        else{
            %>
            <li class="new_tile" data-id="0">
                +
            </li>
            <%
        }
        %>

        <%
        _.each(
            tiles,
            function(tile, i, list){
            %>

            <li data-id="<%= tile.get('id') %>">

                <img src="../public/img/sprites/<%= tile.get('source') %>.png"/>

            </li>

            <%
            }
        );
        %>

    </script>

</ul>