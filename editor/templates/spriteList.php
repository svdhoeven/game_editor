<ul class="spriteList">

    <script id="tpl_spriteList" type="text/template">
        <li class="header">Sprites</li>

        <%
        _.each(
            sprites,
            function(sprite, i, list){
                %>

                <li data-id="<%= sprite.get('id') %>">

                    <figure>
                        <img src="../public/img/sprites/<%= sprite.get('source') %>.png"/>
                        <figcaption><%= sprite.get('source') %></figcaption>
                    </figure>

                </li>

                <%
            }
        );
        %>

    </script>

</ul>