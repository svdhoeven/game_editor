<ul class="tileList">

    <script id="tpl_tileList" type="text/template">
        <li class="header">Tiles</li>

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