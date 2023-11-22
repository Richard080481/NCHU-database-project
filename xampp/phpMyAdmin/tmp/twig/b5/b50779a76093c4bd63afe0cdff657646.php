<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* server/privileges/subnav.twig */
class __TwigTemplate_d8a2c3d453b768731422e19e73be4e71 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<div class=\"row\">
  <ul class=\"nav nav-pills m-2\">
    <li class=\"nav-item\">
      <a class=\"nav-link";
        // line 4
        echo (((($context["active"] ?? null) == "privileges")) ? (" active") : (""));
        echo "\" href=\"";
        echo PhpMyAdmin\Url::getFromRoute("/server/privileges", ["viewing_mode" => "server"]);
        echo "\">
        ";
echo _gettext("User accounts overview");
        // line 6
        echo "      </a>
    </li>
    ";
        // line 8
        if (($context["is_super_user"] ?? null)) {
            // line 9
            echo "      <li class=\"nav-item\">
        <a class=\"nav-link";
            // line 10
            echo (((($context["active"] ?? null) == "user-groups")) ? (" active") : (""));
            echo "\" href=\"";
            echo PhpMyAdmin\Url::getFromRoute("/server/user-groups");
            echo "\">
          ";
echo _gettext("User groups");
            // line 12
            echo "        </a>
      </li>
    ";
        }
        // line 15
        echo "  </ul>
</div>
";
    }

    public function getTemplateName()
    {
        return "server/privileges/subnav.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  70 => 15,  65 => 12,  58 => 10,  55 => 9,  53 => 8,  49 => 6,  42 => 4,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "server/privileges/subnav.twig", "C:\\Users\\richa\\Documents\\GitHub\\NCHU-database-project\\xampp\\phpMyAdmin\\templates\\server\\privileges\\subnav.twig");
    }
}
