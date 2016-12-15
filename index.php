<?hh

// Require Mandatory include
require(__DIR__.'/vendor/autoload.php');
require("ini.php");

class :form-field extends :x:element
{
    use XHPHelpers;
    use XHPReact;

    attribute
    :xhp:html-element,
    string id @required,
    string name @required,
    string print @required,
    array list @required;

    protected function render(): XHPRoot
    {
        $this->constructReactInstance(
        'Form',
            Map {
                'id' => $this->:id,
                'name' => $this->:name,
                'print' => $this->:print,
                'list' => $this->:list,
            }
        );
        return <div id={$this->getID()} />;
    }
}

async function simple_query($connection): Awaitable<array>
{
    $result = await $connection->queryf('SELECT * FROM items');
    return $result->mapRows()->toArray();
}

// Get back stuff on DB
$sqlr_list = $PDO->query("SELECT * FROM items")->fetchAll(PDO::FETCH_ASSOC);

$xhp =
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/styles.css" />
        <script src="js-build/bundle.js" />
    </head>
    <body>
        <x:js-scope>
            <form-field id="1"
                        name="item"
                        print="Enter new item"
                        list={$sqlr_list} />
        </x:js-scope>
    </body>
</html>;

print $xhp;
